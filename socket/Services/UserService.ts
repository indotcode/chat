import User from './../Models/User'
import name from './../Helper/name'
class UserService
{
    save = async (user: any) => {
        const userExists: any = await User.exists({user_id: user.id})
        const data = {
            user_id: user.id,
            name: name(user),
            slug: "@"+user.id,
            role: user.role,
            phone: user.phone,
            email: user.email,
            avatar: user.avatar,
            visitDate: (new Date())
        }
        if(!userExists){
            await User.create(data)
        } else {
            await User.updateOne({user_id: user.id}, data)
        }
        return User.findOne({user_id: user.id});
    }
}

export default new UserService()