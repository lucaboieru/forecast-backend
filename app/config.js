var config = module.exports;
var PRODUCTION = process.env.NODE_ENV === "production";

config.express = {
    port: process.env.EXPRESS_PORT || 9191,
    ip: "127.0.0.1"
};

config.mongodb = {
    port: process.env.MONGODB_PORT || 27017,
    host: process.env.MONGODB_HOST || "localhost"
};

config.routes = {
    home: {
        reg: "^/*$",
        path: "routes/views/index.html"
    }
};

config.operations = {
    apiKey: "/@",
    apis: {
        resource: {
            index: {
                url: "/resources",
                method: "get",
                path: "resourceController/controller.js"
            },
            create: {
                url: "/resources",
                method: "post",
                path: "resourceController/controller.js"
            },
            show: {
                url: "/resources/:rid",
                method: "get",
                path: "resourceController/controller.js"
            },
            destroy: {
                url: "/resources/:rid",
                method: "delete",
                path: "resourceController/controller.js"
            },
            update: {
                url: "/resources/:rid",
                method: "put",
                path: "resourceController/controller.js"
            }
        },
        skill: {
            index: {
                url: "/skills",
                method: "get",
                path: "skillController/controller.js"
            },
            create: {
                url: "/skills",
                method: "post",
                path: "skillController/controller.js"
            }
        },
        skill: {
            show: {
                url: "/users/:uid",
                method: "get",
                path: "userController/controller.js"
            },
            create: {
                url: "/users",
                method: "post",
                path: "userController/controller.js"
            }
        }
    }
};

if (PRODUCTION) {
    config.express.ip = "0.0.0.0";
}
