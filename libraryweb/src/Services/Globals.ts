class Globals{
}

class DevelopmentGlobals extends Globals{
    public urls = {
        customers:  "http://localhost:8080/customers/",
        admin:  "http://localhost:8080/admin/",
        company: "http://localhost:8080/company/",
        client: "http://localhost:8080/client/",
        images: "http://localhost:8080/client/coupons/images/"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        customers:  "/customers/",
        admin:  "/admin/",
        company: "/company/",
        client: "/client/",
        images: "client/coupons/images/"
     
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;