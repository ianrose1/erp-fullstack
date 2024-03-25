export default interface User {
    id: number,
    profile: {
        firstname: string,
        lastname: string,
        email:string,
        phone: string
      },
    isAdmin: boolean,
    active: boolean,
    status: string,
    companies: [{
        id: number,
        name: string,
        teams: [{
            id: number,
            name: string,
            users: [{
                id: number,
                profile: {
                    firstname: string,
                    lastname: string,
                  },
                active: boolean,
              }]
          }],
        users: [{
            id: number,
            profile: {
                firstname: string,
                lastname: string,
              },
            active: boolean,
          }]
      }],
    teams: [{
        id: number,
        name: string,
        users: [{
            id: number,
            profile: {
                firstname: string,
                lastname: string,
              },
            active: boolean,
          }]
      }]
  }