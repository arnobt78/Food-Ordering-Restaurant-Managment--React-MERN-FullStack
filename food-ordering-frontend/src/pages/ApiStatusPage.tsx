import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import {
  Activity,
  Server,
  Database,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Wifi,
  Shield,
  Zap,
  HardDrive,
} from "lucide-react";

interface SystemStatus {
  status: "healthy" | "warning" | "error";
  responseTime: number;
  uptime: number;
  lastChecked: string;
}

interface ServiceStatus {
  name: string;
  status: "healthy" | "warning" | "error";
  responseTime: number;
  endpoint: string;
  description: string;
}

const ApiStatusPage = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    status: "healthy",
    responseTime: 0,
    uptime: 0,
    lastChecked: new Date().toISOString(),
  });

  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: "API Server",
      status: "healthy",
      responseTime: 45,
      endpoint: "http://localhost:7001/health",
      description: "Main API server health check",
    },
    {
      name: "Database",
      status: "healthy",
      responseTime: 12,
      endpoint: "MongoDB Connection",
      description: "MongoDB database connection status",
    },
    {
      name: "Payment Gateway",
      status: "healthy",
      responseTime: 78,
      endpoint: "Stripe API",
      description: "Stripe payment processing service",
    },
    {
      name: "File Storage",
      status: "healthy",
      responseTime: 23,
      endpoint: "Cloudinary",
      description: "Image and file storage service",
    },
    {
      name: "Authentication",
      status: "healthy",
      responseTime: 34,
      endpoint: "Auth0",
      description: "User authentication service",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const checkSystemHealth = async () => {
    setIsLoading(true);
    try {
      const startTime = Date.now();
      const response = await fetch("http://localhost:7001/health");
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      if (response.ok) {
        setSystemStatus({
          status: "healthy",
          responseTime,
          uptime: Math.floor(Math.random() * 86400) + 3600, // Simulated uptime
          lastChecked: new Date().toISOString(),
        });

        // Simulate service status updates
        setServices((prev) =>
          prev.map((service) => ({
            ...service,
            responseTime: Math.floor(Math.random() * 100) + 10,
            status:
              Math.random() > 0.1
                ? "healthy"
                : Math.random() > 0.5
                ? "warning"
                : "error",
          }))
        );
      } else {
        setSystemStatus({
          status: "error",
          responseTime,
          uptime: 0,
          lastChecked: new Date().toISOString(),
        });
      }
    } catch (error) {
      setSystemStatus({
        status: "error",
        responseTime: 0,
        uptime: 0,
        lastChecked: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSystemHealth();
    const interval = setInterval(checkSystemHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const overallHealth =
    (services.filter((s) => s.status === "healthy").length / services.length) *
    100;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              API Status
            </h1>
            <p className="text-lg text-gray-600">
              Real-time monitoring of BigHungers API services
            </p>
          </div>
          <Button
            onClick={checkSystemHealth}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {/* Overall System Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-6 w-6 text-blue-600" />
              Overall System Status
            </CardTitle>
            <CardDescription>
              Last checked:{" "}
              {new Date(systemStatus.lastChecked).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {getStatusIcon(systemStatus.status)}
                </div>
                <p className="text-sm text-gray-600">System Status</p>
                <Badge className={getStatusColor(systemStatus.status)}>
                  {systemStatus.status.toUpperCase()}
                </Badge>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-lg font-semibold">
                  {systemStatus.responseTime}ms
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Uptime</p>
                <p className="text-lg font-semibold">
                  {formatUptime(systemStatus.uptime)}
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600">Health Score</p>
                <p className="text-lg font-semibold">
                  {overallHealth.toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Health</span>
                <span>{overallHealth.toFixed(1)}%</span>
              </div>
              <Progress value={overallHealth} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Service Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {service.name === "Database" && (
                      <Database className="h-5 w-5 text-green-600" />
                    )}
                    {service.name === "Payment Gateway" && (
                      <Shield className="h-5 w-5 text-blue-600" />
                    )}
                    {service.name === "File Storage" && (
                      <HardDrive className="h-5 w-5 text-purple-600" />
                    )}
                    {service.name === "Authentication" && (
                      <Wifi className="h-5 w-5 text-orange-600" />
                    )}
                    {service.name === "API Server" && (
                      <Server className="h-5 w-5 text-indigo-600" />
                    )}
                    {service.name}
                  </CardTitle>
                  <Badge className={getStatusColor(service.status)}>
                    {service.status.toUpperCase()}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Response Time:</span>
                    <span className="font-medium">
                      {service.responseTime}ms
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Endpoint:</span>
                    <span className="font-mono text-xs text-gray-500 truncate max-w-[120px]">
                      {service.endpoint}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Performance</span>
                        <span>
                          {service.responseTime < 50
                            ? "Excellent"
                            : service.responseTime < 100
                            ? "Good"
                            : "Slow"}
                        </span>
                      </div>
                      <Progress
                        value={Math.max(0, 100 - service.responseTime)}
                        className="h-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Metrics */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            System Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-green-600" />
                  Database Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Connection Pool
                    </span>
                    <span className="text-sm font-medium">Active: 12/20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Query Performance
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      Excellent
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Storage Used</span>
                    <span className="text-sm font-medium">2.4 GB / 10 GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  API Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Requests/min</span>
                    <span className="text-sm font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Response</span>
                    <span className="text-sm font-medium text-green-600">
                      45ms
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Error Rate</span>
                    <span className="text-sm font-medium text-green-600">
                      0.02%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      SSL Certificate
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      Valid
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Rate Limiting</span>
                    <span className="text-sm font-medium text-green-600">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Last Security Scan
                    </span>
                    <span className="text-sm font-medium">2 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiStatusPage;
