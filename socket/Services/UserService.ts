import User from './../Models/User'

class UserService
{
    save = async (user: any) => {
        let name: any = [],
            i = 0;
        if(user.name !== null) name[i++] = user.name
        if(user.last_name !== null) name[i++] = user.last_name
        if(user.middle_name !== null) name[i++] = user.middle_name
        name = name.join(" ")
        const userExists: any = await User.exists({user_id: user.id})
        const data = {
            user_id: user.id,
            name: name,
            slug: "@"+user.id,
            role: user.role,
            phone: user.phone,
            email: user.email,
            visitDate: (new Date())
        }
        if(!userExists){
            await User.create(data)
        } else {
            await User.update({user_id: user.id}, data)
        }

        return User.findOne({user_id: user.id});
    }
}

export default new UserService()