const frontEndPrefix = ""

export default {
    getBackendUrl: (suffix) => {return "https://master-forky.up.railway.app" + suffix},
    localTokenKey: "token-mgr28ocn3gcr87",

    sessionIdKey: "id-biufniwehmf83298m",
    sessionEmailKey: "email-ndm983mh2iur30",
    sessionNameKey: "name-ncjkhm8728r29uf",

    prefix: "/gismos",
    homePage: `${frontEndPrefix}/`,
    loginPage: `${frontEndPrefix}/login`,
    profilePage: `${frontEndPrefix}/profile`,
    productPage: `${frontEndPrefix}/product`,
    confirmPage: `${frontEndPrefix}/confirm`,
    ordersPage: `${frontEndPrefix}/orders`,
}