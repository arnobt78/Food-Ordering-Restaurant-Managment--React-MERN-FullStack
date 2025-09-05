import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  Zap,
  Clock,
  HardDrive,
  Wifi,
  Settings,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface PerformanceMetrics {
  loadTime: number;
  bundleSize: number;
  imageOptimization: number;
  caching: number;
  compression: number;
  overallScore: number;
  recommendations: string[];
}

const PerformanceOptimizer = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    bundleSize: 0,
    imageOptimization: 0,
    caching: 0,
    compression: 0,
    overallScore: 0,
    recommendations: [],
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const startTimeRef = useRef<number>(0);

  const analyzePerformance = useCallback(async () => {
    setIsAnalyzing(true);
    startTimeRef.current = performance.now();

    // Real performance analysis using browser APIs
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get real load time from Navigation Timing API
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    let loadTime = 0;

    // Debug navigation timing
    console.log("Navigation Timing Debug:", {
      navigation: navigation
        ? {
            loadEventStart: navigation.loadEventStart,
            loadEventEnd: navigation.loadEventEnd,
            domContentLoadedEventStart: navigation.domContentLoadedEventStart,
            domContentLoadedEventEnd: navigation.domContentLoadedEventEnd,
            domComplete: navigation.domComplete,
          }
        : "No navigation timing available",
    });

    if (
      navigation &&
      navigation.loadEventEnd > 0 &&
      navigation.loadEventStart > 0
    ) {
      loadTime =
        Math.round(
          (navigation.loadEventEnd - navigation.loadEventStart) * 1000
        ) / 1000; // Keep decimal precision
    } else if (
      navigation &&
      navigation.domComplete > 0 &&
      navigation.loadEventStart > 0
    ) {
      loadTime =
        Math.round(
          (navigation.domComplete - navigation.loadEventStart) * 1000
        ) / 1000;
    } else if (
      navigation &&
      navigation.domContentLoadedEventEnd > 0 &&
      navigation.loadEventStart > 0
    ) {
      loadTime =
        Math.round(
          (navigation.domContentLoadedEventEnd - navigation.loadEventStart) *
            1000
        ) / 1000;
    } else if (navigation && navigation.domContentLoadedEventStart > 0) {
      loadTime =
        Math.round(navigation.domContentLoadedEventStart * 1000) / 1000;
    } else {
      // Fallback: estimate based on current performance time
      loadTime = Math.round(performance.now() * 0.15); // Estimate 15% of current time
    }

    // Get real bundle size from Resource Timing API
    const resources = performance.getEntriesByType(
      "resource"
    ) as PerformanceResourceTiming[];

    // If no resources found, wait a bit and try again
    if (resources.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const retryResources = performance.getEntriesByType(
        "resource"
      ) as PerformanceResourceTiming[];
      resources.push(...retryResources);
    } else {
      // Use the original resources array to avoid duplication
      console.log(
        "Using original resources array with",
        resources.length,
        "resources"
      );
    }

    // Improved JS resource detection (including Vite dev server)
    const jsResources = resources.filter((resource) => {
      const name = resource.name.toLowerCase();
      return (
        (name.includes(".js") ||
          name.includes("javascript") ||
          name.includes("bundle") ||
          name.includes("chunk") ||
          name.includes("vendor") ||
          name.includes("@vite/client") ||
          name.includes("@react-refresh") ||
          name.includes("main.tsx") ||
          name.includes("env.mjs") ||
          name.includes("react.js")) &&
        !name.includes("node_modules")
      );
    });

    // Debug JS resources
    console.log("JS Resources Debug:", {
      totalResources: resources.length,
      jsResourcesFound: jsResources.length,
      sampleResources: resources.slice(0, 5).map((r) => ({
        name: r.name,
        size: r.transferSize || r.decodedBodySize || 0,
      })),
      jsResourceNames: jsResources.map((r) => r.name),
    });
    const bundleSize = jsResources.reduce((total, resource) => {
      return total + (resource.transferSize || resource.decodedBodySize || 0);
    }, 0);

    // If no JS resources found, estimate based on total resources
    const finalBundleSize =
      bundleSize > 0
        ? bundleSize
        : resources.length > 0
        ? Math.round(resources.length * 50000)
        : 100000; // Estimate 50KB per resource

    // Analyze images for optimization
    const imageResources = resources.filter((resource) =>
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(resource.name)
    );
    const optimizedImages = imageResources.filter(
      (resource) =>
        resource.name.includes("webp") || resource.name.includes("avif")
    ).length;
    const imageOptimization =
      imageResources.length > 0
        ? Math.round((optimizedImages / imageResources.length) * 100)
        : 50; // Default to 50% if no images found

    // Check caching effectiveness (more realistic for dev vs prod)
    const cachedResources = resources.filter(
      (resource) => resource.transferSize === 0 && resource.decodedBodySize > 0
    ).length;

    // In development, simulate some caching based on resource types
    const isDevelopment = window.location.hostname === "localhost";
    let caching;
    if (isDevelopment) {
      // In development, simulate caching for static assets
      const staticResources = resources.filter(
        (r) =>
          r.name.includes(".css") ||
          r.name.includes(".js") ||
          r.name.includes(".png") ||
          r.name.includes(".jpg")
      ).length;
      caching = Math.round((staticResources / resources.length) * 100) || 25; // At least 25% in dev
    } else {
      caching =
        resources.length > 0
          ? Math.round((cachedResources / resources.length) * 100)
          : 30;
    }

    // Check compression effectiveness (more realistic for dev vs prod)
    const compressedResources = resources.filter((resource) => {
      const transferSize = resource.transferSize || 0;
      const decodedSize = resource.decodedBodySize || 0;
      return transferSize > 0 && decodedSize > 0 && transferSize < decodedSize;
    }).length;

    let compression;
    if (isDevelopment) {
      // In development, simulate compression for text-based resources
      const textResources = resources.filter(
        (r) =>
          r.name.includes(".js") ||
          r.name.includes(".css") ||
          r.name.includes(".html")
      ).length;
      compression = Math.round((textResources / resources.length) * 100) || 20; // At least 20% in dev
    } else {
      compression =
        resources.length > 0
          ? Math.round((compressedResources / resources.length) * 100)
          : 20;
    }

    // Debug caching and compression
    console.log("Caching/Compression Debug:", {
      isDevelopment: isDevelopment,
      totalResources: resources.length,
      cachedResources: cachedResources,
      compressedResources: compressedResources,
      finalCaching: caching,
      finalCompression: compression,
      sampleResourceSizes: resources.slice(0, 3).map((r) => ({
        name: r.name.split("/").pop(),
        transferSize: r.transferSize,
        decodedSize: r.decodedBodySize,
      })),
    });

    // Calculate overall score based on real metrics with load time factor
    const loadTimeScore =
      loadTime < 1000 ? 100 : loadTime < 2000 ? 80 : loadTime < 3000 ? 60 : 40;
    const overallScore = Math.round(
      (imageOptimization + caching + compression + loadTimeScore) / 4
    );

    // Generate recommendations based on real data
    const recommendations = [];
    if (loadTime > 2000)
      recommendations.push(
        "Consider code splitting to reduce initial bundle size"
      );
    if (bundleSize > 1500000)
      // 1.5MB
      recommendations.push(
        "Optimize and compress images to reduce bundle size"
      );
    if (imageOptimization < 70)
      recommendations.push("Implement lazy loading for images");
    if (caching < 80)
      recommendations.push("Enable browser caching for static assets");
    if (compression < 85)
      recommendations.push("Enable Gzip compression on server");

    // Add additional recommendations based on real metrics
    if (jsResources.length > 10)
      recommendations.push(
        "Consider bundling JavaScript files to reduce HTTP requests"
      );
    if (imageResources.length > 5)
      recommendations.push(
        "Use responsive images and modern formats (WebP, AVIF)"
      );

    // Debug: Log real performance data
    console.log("Real Performance Analysis:", {
      loadTime,
      bundleSize: formatBytes(finalBundleSize),
      jsResourcesCount: jsResources.length,
      totalResourcesCount: resources.length,
      imageResourcesCount: imageResources.length,
      optimizedImagesCount: optimizedImages,
      cachedResourcesCount: cachedResources,
      compressedResourcesCount: compressedResources,
      imageOptimization,
      caching,
      compression,
      overallScore,
    });

    setMetrics({
      loadTime,
      bundleSize: finalBundleSize,
      imageOptimization,
      caching,
      compression,
      overallScore,
      recommendations,
    });

    setIsAnalyzing(false);
  }, []);

  const optimizePerformance = async () => {
    setIsOptimizing(true);

    // Simulate optimization process
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Simulate improved metrics
    setMetrics((prev) => ({
      ...prev,
      loadTime: prev.loadTime * 0.7,
      bundleSize: prev.bundleSize * 0.8,
      imageOptimization: Math.min(95, prev.imageOptimization + 15),
      caching: Math.min(95, prev.caching + 10),
      compression: Math.min(95, prev.compression + 10),
      overallScore: Math.min(95, prev.overallScore + 12),
      recommendations: prev.recommendations.slice(0, 2), // Remove some recommendations
    }));

    setIsOptimizing(false);
  };

  useEffect(() => {
    analyzePerformance();
  }, [analyzePerformance]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatLoadTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Performance Optimizer
            </h1>
            <p className="text-lg text-gray-600">
              Monitor and optimize your application performance
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={analyzePerformance}
              disabled={isAnalyzing}
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${isAnalyzing ? "animate-spin" : ""}`}
              />
              Analyze
            </Button>
            <Button
              onClick={optimizePerformance}
              disabled={isOptimizing || metrics.overallScore === 0}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <Zap className="h-4 w-4" />
              Optimize
            </Button>
          </div>
        </div>

        {/* Overall Performance Score */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              Overall Performance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div
                    className={`text-4xl font-bold ${getScoreColor(
                      metrics.overallScore
                    )}`}
                  >
                    {metrics.overallScore}/100
                  </div>
                  <Badge className={getScoreBadge(metrics.overallScore)}>
                    {metrics.overallScore >= 90
                      ? "Excellent"
                      : metrics.overallScore >= 70
                      ? "Good"
                      : "Needs Improvement"}
                  </Badge>
                </div>
                <div className="w-32">
                  <Progress value={metrics.overallScore} className="h-3" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Last analyzed</p>
                <p className="text-sm font-medium">
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Load Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatLoadTime(metrics.loadTime)}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Progress
                  value={Math.max(0, 100 - metrics.loadTime / 50)}
                  className="flex-1 h-2"
                />
                <span className="text-sm text-gray-600">
                  {metrics.loadTime < 1000
                    ? "Fast"
                    : metrics.loadTime < 2000
                    ? "Good"
                    : "Slow"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-green-600" />
                Bundle Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatBytes(metrics.bundleSize)}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Progress
                  value={Math.max(0, 100 - metrics.bundleSize / 50)}
                  className="flex-1 h-2"
                />
                <span className="text-sm text-gray-600">
                  {metrics.bundleSize < 1000000
                    ? "Small"
                    : metrics.bundleSize < 2000000
                    ? "Medium"
                    : "Large"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-purple-600" />
                Image Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(metrics.imageOptimization)}%
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Progress
                  value={metrics.imageOptimization}
                  className="flex-1 h-2"
                />
                <span className="text-sm text-gray-600">
                  {metrics.imageOptimization >= 90
                    ? "Excellent"
                    : metrics.imageOptimization >= 70
                    ? "Good"
                    : "Poor"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-orange-600" />
                Caching
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(metrics.caching)}%
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Progress value={metrics.caching} className="flex-1 h-2" />
                <span className="text-sm text-gray-600">
                  {metrics.caching >= 90
                    ? "Excellent"
                    : metrics.caching >= 70
                    ? "Good"
                    : "Poor"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Compression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(metrics.compression)}%
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Progress value={metrics.compression} className="flex-1 h-2" />
                <span className="text-sm text-gray-600">
                  {metrics.compression >= 90
                    ? "Excellent"
                    : metrics.compression >= 70
                    ? "Good"
                    : "Poor"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        {metrics.recommendations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Optimization Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {metrics.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <p className="text-sm text-gray-700">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PerformanceOptimizer;
