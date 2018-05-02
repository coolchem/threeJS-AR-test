
let baseURL:string = window.location.protocol + "//" + window.location.host;

export const Resources = {

    URL:{

        base:baseURL,
    },

    request:{

        contentTypeJSON:"application/json",
        methods:{
            GET:"get",
            POST:"post",
            PUT:"put",
            DELETE:"delete",
            PATCH:"patch",
            HEAD:"head",
        },
        headers:{
            AUTHORIZATION:"Authorization",
            ACCEPT:"Accept",
            CONTENT_TYPE:"Content-Type"
        }
    },
    misc:{},
    caches:{}
};