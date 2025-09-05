import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Copy, Code, Database, CreditCard } from "lucide-react";

const ApiDocsPage = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:7001";

  const endpoints = [
    {
      method: "GET",
      path: "/api/restaurant/search/:city",
      description: "Search restaurants by city",
      auth: false,
      params: [
        {
          name: "city",
          type: "string",
          required: true,
          description: "City name to search (path parameter)",
        },
      ],
      example: `${baseUrl}/api/restaurant/search/New York`,
    },
    {
      method: "GET",
      path: "/api/restaurant/cities/all",
      description: "Get all available cities",
      auth: false,
      params: [],
      example: `${baseUrl}/api/restaurant/cities/all`,
    },
    {
      method: "GET",
      path: "/api/restaurant/:restaurantId",
      description: "Get restaurant details by ID",
      auth: false,
      params: [
        {
          name: "restaurantId",
          type: "string",
          required: true,
          description: "Restaurant ID",
        },
      ],
      example: `${baseUrl}/api/restaurant/64f8b8b8b8b8b8b8b8b8b8b8`,
    },
    {
      method: "POST",
      path: "/api/order/checkout",
      description: "Create a new order",
      auth: true,
      body: {
        restaurantId: "string",
        deliveryDetails: {
          name: "string",
          addressLine1: "string",
          city: "string",
          email: "string",
        },
        cartItems: [
          {
            menuItemId: "string",
            name: "string",
            quantity: "number",
          },
        ],
      },
      example: `${baseUrl}/api/order/checkout`,
    },
    {
      method: "GET",
      path: "/api/order",
      description: "Get user orders",
      auth: true,
      example: `${baseUrl}/api/order`,
    },
    {
      method: "GET",
      path: "/api/my/user",
      description: "Get current user profile",
      auth: true,
      example: `${baseUrl}/api/my/user`,
    },
    {
      method: "PUT",
      path: "/api/my/user",
      description: "Update user profile",
      auth: true,
      body: {
        name: "string",
        addressLine1: "string",
        city: "string",
        country: "string",
      },
      example: `${baseUrl}/api/my/user`,
    },
    {
      method: "GET",
      path: "/api/my/restaurant",
      description: "Get user's restaurant",
      auth: true,
      example: `${baseUrl}/api/my/restaurant`,
    },
    {
      method: "POST",
      path: "/api/my/restaurant",
      description: "Create or update restaurant",
      auth: true,
      body: {
        restaurantName: "string",
        city: "string",
        country: "string",
        deliveryPrice: "number",
        estimatedDeliveryTime: "number",
        cuisines: ["string"],
        menuItems: [
          {
            name: "string",
            price: "number",
          },
        ],
        imageUrl: "string",
      },
      example: `${baseUrl}/api/my/restaurant`,
    },
    {
      method: "GET",
      path: "/api/my/restaurant/order",
      description: "Get orders for user's restaurant",
      auth: true,
      params: [],
      example: `${baseUrl}/api/my/restaurant/order`,
    },
    {
      method: "PATCH",
      path: "/api/my/restaurant/order/:orderId/status",
      description: "Update order status",
      auth: true,
      params: [
        {
          name: "orderId",
          type: "string",
          required: true,
          description: "Order ID",
        },
      ],
      requestBody: {
        status: "string",
      },
      example: `${baseUrl}/api/my/restaurant/order/64f8b8b8b8b8b8b8b8b8b8b8/status`,
    },
    {
      method: "POST",
      path: "/api/order/checkout/create-checkout-session",
      description: "Create Stripe checkout session",
      auth: true,
      params: [],
      requestBody: {
        restaurantId: "string",
        deliveryDetails: {
          name: "string",
          addressLine1: "string",
          city: "string",
          email: "string",
        },
        cartItems: [
          {
            menuItemId: "string",
            name: "string",
            quantity: "number",
          },
        ],
      },
      example: `${baseUrl}/api/order/checkout/create-checkout-session`,
    },
    {
      method: "POST",
      path: "/api/order/checkout/webhook",
      description: "Stripe webhook handler",
      auth: false,
      params: [],
      example: `${baseUrl}/api/order/checkout/webhook`,
    },
    {
      method: "GET",
      path: "/api/business-insights",
      description: "Get business analytics data",
      auth: true,
      params: [
        {
          name: "timeRange",
          type: "string",
          required: false,
          description: "Time range (7d, 30d, 90d, 1y)",
        },
      ],
      example: `${baseUrl}/api/business-insights?timeRange=30d`,
    },
    {
      method: "GET",
      path: "/api/business-insights/test",
      description: "Get business analytics data (unauthenticated)",
      auth: false,
      params: [
        {
          name: "timeRange",
          type: "string",
          required: false,
          description: "Time range (7d, 30d, 90d, 1y)",
        },
      ],
      example: `${baseUrl}/api/business-insights/test?timeRange=30d`,
    },
    {
      method: "GET",
      path: "/api/business-insights/debug-orders",
      description: "Debug endpoint - get raw order data",
      auth: false,
      params: [],
      example: `${baseUrl}/api/business-insights/debug-orders`,
    },
    {
      method: "GET",
      path: "/api/business-insights/debug-restaurants",
      description: "Debug endpoint - get raw restaurant data",
      auth: false,
      params: [],
      example: `${baseUrl}/api/business-insights/debug-restaurants`,
    },
    {
      method: "GET",
      path: "/health",
      description: "Health check endpoint",
      auth: false,
      params: [],
      example: `${baseUrl}/health`,
    },
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-800";
      case "POST":
        return "bg-blue-100 text-blue-800";
      case "PUT":
        return "bg-yellow-100 text-yellow-800";
      case "PATCH":
        return "bg-purple-100 text-purple-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          API Documentation
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete API reference for BigHungers Food Ordering Platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-600" />
                Base URL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                {baseUrl}
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">MongoDB with Mongoose ODM</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Stripe Payment Gateway</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Endpoints</TabsTrigger>
          <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {endpoints.map((endpoint, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className={getMethodColor(endpoint.method)}>
                      {endpoint.method}
                    </Badge>
                    <code className="text-lg font-mono">{endpoint.path}</code>
                    {endpoint.auth && (
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-800"
                      >
                        Auth Required
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(endpoint.example)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="text-base mt-2">
                  {endpoint.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                {endpoint.params && endpoint.params.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Parameters:</h4>
                    <div className="space-y-2">
                      {endpoint.params.map((param, paramIndex) => (
                        <div
                          key={paramIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <code className="bg-gray-100 px-2 py-1 rounded">
                            {param.name}
                          </code>
                          <span className="text-gray-500">({param.type})</span>
                          {param.required && (
                            <Badge variant="outline" className="text-xs">
                              Required
                            </Badge>
                          )}
                          <span className="text-gray-600">
                            - {param.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {endpoint.body && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Request Body:</h4>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      <code>{JSON.stringify(endpoint.body, null, 2)}</code>
                    </pre>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-2">Example Request:</h4>
                  <div className="bg-gray-100 p-3 rounded">
                    <code className="text-sm break-all">
                      {endpoint.example}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="restaurants" className="space-y-6">
          {endpoints
            .filter((e) => e.path.includes("restaurant"))
            .map((endpoint, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getMethodColor(endpoint.method)}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg font-mono">{endpoint.path}</code>
                      {endpoint.auth && (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800"
                        >
                          Auth Required
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(endpoint.example)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-base mt-2">
                    {endpoint.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                  {endpoint.params && endpoint.params.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Parameters:</h4>
                      <div className="space-y-2">
                        {endpoint.params.map((param, paramIndex) => (
                          <div
                            key={paramIndex}
                            className="flex items-center gap-2 text-sm"
                          >
                            <code className="bg-gray-100 px-2 py-1 rounded">
                              {param.name}
                            </code>
                            <span className="text-gray-500">
                              ({param.type})
                            </span>
                            {param.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                            <span className="text-gray-600">
                              - {param.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {endpoint.requestBody && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Request Body:</h4>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                        <code>
                          {JSON.stringify(endpoint.requestBody, null, 2)}
                        </code>
                      </pre>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Example Request:</h4>
                    <div className="bg-gray-100 p-3 rounded">
                      <code className="text-sm break-all">
                        {endpoint.example}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          {endpoints
            .filter((e) => e.path.includes("order"))
            .map((endpoint, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getMethodColor(endpoint.method)}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg font-mono">{endpoint.path}</code>
                      {endpoint.auth && (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800"
                        >
                          Auth Required
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(endpoint.example)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-base mt-2">
                    {endpoint.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                  {endpoint.params && endpoint.params.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Parameters:</h4>
                      <div className="space-y-2">
                        {endpoint.params.map((param, paramIndex) => (
                          <div
                            key={paramIndex}
                            className="flex items-center gap-2 text-sm"
                          >
                            <code className="bg-gray-100 px-2 py-1 rounded">
                              {param.name}
                            </code>
                            <span className="text-gray-500">
                              ({param.type})
                            </span>
                            {param.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                            <span className="text-gray-600">
                              - {param.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {endpoint.requestBody && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Request Body:</h4>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                        <code>
                          {JSON.stringify(endpoint.requestBody, null, 2)}
                        </code>
                      </pre>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Example Request:</h4>
                    <div className="bg-gray-100 p-3 rounded">
                      <code className="text-sm break-all">
                        {endpoint.example}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="restaurants" className="space-y-6">
          {endpoints
            .filter((e) => e.path.includes("restaurant"))
            .map((endpoint, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getMethodColor(endpoint.method)}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg font-mono">{endpoint.path}</code>
                      {endpoint.auth && (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800"
                        >
                          Auth Required
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(endpoint.example)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-base mt-2">
                    {endpoint.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                  {endpoint.params && endpoint.params.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Parameters:</h4>
                      <div className="space-y-2">
                        {endpoint.params.map((param, paramIndex) => (
                          <div
                            key={paramIndex}
                            className="flex items-center gap-2 text-sm"
                          >
                            <code className="bg-gray-100 px-2 py-1 rounded">
                              {param.name}
                            </code>
                            <span className="text-gray-500">
                              ({param.type})
                            </span>
                            {param.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                            <span className="text-gray-600">
                              - {param.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {endpoint.requestBody && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Request Body:</h4>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                        <code>
                          {JSON.stringify(endpoint.requestBody, null, 2)}
                        </code>
                      </pre>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Example Request:</h4>
                    <div className="bg-gray-100 p-3 rounded">
                      <code className="text-sm break-all">
                        {endpoint.example}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          {endpoints
            .filter((e) => e.path.includes("order"))
            .map((endpoint, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getMethodColor(endpoint.method)}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg font-mono">{endpoint.path}</code>
                      {endpoint.auth && (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800"
                        >
                          Auth Required
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(endpoint.example)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-base mt-2">
                    {endpoint.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                  {endpoint.params && endpoint.params.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Parameters:</h4>
                      <div className="space-y-2">
                        {endpoint.params.map((param, paramIndex) => (
                          <div
                            key={paramIndex}
                            className="flex items-center gap-2 text-sm"
                          >
                            <code className="bg-gray-100 px-2 py-1 rounded">
                              {param.name}
                            </code>
                            <span className="text-gray-500">
                              ({param.type})
                            </span>
                            {param.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                            <span className="text-gray-600">
                              - {param.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {endpoint.requestBody && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Request Body:</h4>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                        <code>
                          {JSON.stringify(endpoint.requestBody, null, 2)}
                        </code>
                      </pre>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Example Request:</h4>
                    <div className="bg-gray-100 p-3 rounded">
                      <code className="text-sm break-all">
                        {endpoint.example}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {endpoints
            .filter(
              (e) =>
                e.path.includes("business-insights") ||
                e.path.includes("health")
            )
            .map((endpoint, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getMethodColor(endpoint.method)}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg font-mono">{endpoint.path}</code>
                      {endpoint.auth && (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800"
                        >
                          Auth Required
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(endpoint.example)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-base mt-2">
                    {endpoint.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                  {endpoint.params && endpoint.params.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Parameters:</h4>
                      <div className="space-y-2">
                        {endpoint.params.map((param, paramIndex) => (
                          <div
                            key={paramIndex}
                            className="flex items-center gap-2 text-sm"
                          >
                            <code className="bg-gray-100 px-2 py-1 rounded">
                              {param.name}
                            </code>
                            <span className="text-gray-500">
                              ({param.type})
                            </span>
                            {param.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                            <span className="text-gray-600">
                              - {param.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {endpoint.requestBody && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Request Body:</h4>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                        <code>
                          {JSON.stringify(endpoint.requestBody, null, 2)}
                        </code>
                      </pre>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Example Request:</h4>
                    <div className="bg-gray-100 p-3 rounded">
                      <code className="text-sm break-all">
                        {endpoint.example}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {endpoints
            .filter((e) => e.path.includes("user"))
            .map((endpoint, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getMethodColor(endpoint.method)}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg font-mono">{endpoint.path}</code>
                      {endpoint.auth && (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800"
                        >
                          Auth Required
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(endpoint.example)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-base mt-2">
                    {endpoint.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                  {endpoint.params && endpoint.params.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Parameters:</h4>
                      <div className="space-y-2">
                        {endpoint.params.map((param, paramIndex) => (
                          <div
                            key={paramIndex}
                            className="flex items-center gap-2 text-sm"
                          >
                            <code className="bg-gray-100 px-2 py-1 rounded">
                              {param.name}
                            </code>
                            <span className="text-gray-500">
                              ({param.type})
                            </span>
                            {param.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                            <span className="text-gray-600">
                              - {param.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {endpoint.requestBody && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Request Body:</h4>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                        <code>
                          {JSON.stringify(endpoint.requestBody, null, 2)}
                        </code>
                      </pre>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Example Request:</h4>
                    <div className="bg-gray-100 p-3 rounded">
                      <code className="text-sm break-all">
                        {endpoint.example}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiDocsPage;
