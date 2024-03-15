const RoleModel = require('../../models/role')

exports.getAll = async (req, res) => {
    return res.status(200).json({ msg: 'OK', roles: await RoleModel.findAll()})
}

exports.create = async (req, res) => {
    // get body content of request
    const { titreRole } = req.body
    try {
        const role = await RoleModel.create({
            titreRole
        })
        if (!role.id){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', role: role.dataValues})
        // return role.id ? res.status(200).json({ msg: 'OK', role}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.update = async (req, res) => {
    try {
        if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
        if (!req.body) return res.status(400).json({ msg: 'BAD REQUEST BODY IS REQUIRED'})
        const { titreRole } = req.body
        const { uuid } = req.params
        const role = await RoleModel.update({
            titreRole
        }, {where: { id: uuid}})
        return res.status(200).json({ msg: 'OK', role})
        // return role.id ? res.status(200).json({ msg: 'OK', role}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.delete = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        const role = await RoleModel.destroy( {where: { id: uuid}})
        console.log(role)
        if (!role){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK'})
        // return role.id ? res.status(200).json({ msg: 'OK', role}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.getById = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        // const role = await roleModel.findByPk(uuid)
        const role = await RoleModel.findOne({
            include: [
                {
                association: 'role_belongsTo_user', // alias = as
                attributes: { exclude: [ 'createdAt', 'updatedAt', 'password' ] }
            }
            ],
            where: {id: uuid},
            attributes: {
                exclude: [
                    'createdAt'
                ]
            }
        })
        console.log(role.dataValues)
        if (!role){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', role: role.dataValues})
        // return role.id ? res.status(200).json({ msg: 'OK', role}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}
