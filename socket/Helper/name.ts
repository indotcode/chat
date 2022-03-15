export default (user: any) => {
    let name: any = [],
        i = 0;
    if(user.name !== null) name[i++] = user.name
    if(user.last_name !== null) name[i++] = user.last_name
    if(user.middle_name !== null) name[i++] = user.middle_name
    return name.join(" ")
}
