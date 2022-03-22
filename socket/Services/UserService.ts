import User from './../Models/User'
import name from './../Helper/name'

class UserService
{
    public save = async (user: any) => {
        if(user.id === null){
            throw 'Нет id пользователя';
        }
        const userExists: any = await User.exists({user_id: user.id})
        let data = {
            user_id: user.id,
            name: name(user),
            slug: "@"+user.id,
            phone: user.phone,
            email: user.email,
            avatar: user.avatar,
            visit_at: (new Date()),
            updated_at: (new Date())
        }
        if(!userExists){
            data = Object.assign(data, {created_at: (new Date())})
            await User.create(data)
        } else {
            await User.updateOne({user_id: user.id}, data)
        }
        return User.findOne({user_id: user.id});
    }
}

export default new UserService()