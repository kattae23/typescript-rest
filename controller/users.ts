import { Request, Response } from 'express';
import User from '../models/user';


export const getUsers = async ( req: Request, res: Response) => {

    const users = await User.findAll();

    res.json({users});    

};

export const getUser = async ( req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk(id);

    if ( !user ) {
        return res.status(400).json({msg: 'theres no user with that id ' + id });
    }

    console.log(user);
    res.json({user});    

};

export const postUser = async ( req: Request, res: Response) => {

    const { firstName, lastName, email } = req.body;

    try {
        
        const emailExist = await User.findOne({
            where: {
                email
            }
        });

        if ( emailExist ) {
            return res.status(400).json({
                msg: 'The email *' + email + '* already exist' 
            });
        }

        const user = await User.create({ firstName, lastName, email });

        res.json( user );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk with the administrator'
        });
    }

};

export const putUser = async ( req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        
        const user = await User.findByPk( id );
        if (!user ) {
            return res.status(404).json({
                msg: 'Theres no a user with that id ' + id
            });
        }

        await user.update(body);

        res.json( user );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk with the administrator'
        });
    }

};

export const deleteUser = async ( req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk( id );
    if (!user ) {
        return res.status(404).json({
            msg: 'Theres no a user with that id ' + id
        });
    }

    await user.update({status: false});

    //eliminación física
    // await user.destroy();


    res.json(user);    

};
