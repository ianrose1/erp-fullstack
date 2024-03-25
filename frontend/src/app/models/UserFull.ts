export default interface UserFull {
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
        description: string,
        teams: [{
            id: number,
            name: string,
            description: string,
            users: [{
                id: number,
                profile: {
                    firstname: string,
                    lastname: string,
                    email:string,
                    phone: string
                  },
                isAdmin: boolean,
                active: boolean,
                status: string
              }]
          }],
        users: [{
            id: number,
            profile: {
                firstname: string,
                lastname: string,
                email:string,
                phone: string
              },
            isAdmin: boolean,
            active: boolean,
            status: string
          }]
      }],
    teams: [{
        id: number,
        name: string,
        description: string,
        users: [{
            id: number,
            profile: {
                firstname: string,
                lastname: string,
                email:string,
                phone: string
              },
            isAdmin: boolean,
            active: boolean,
            status: string
          }]
      }]
  }