import {z} from 'zod';

export const signupInput = z.object({
    name : z.string().min(3,{
        message : 'Name should have atleast 3 characters'
    }).max(255),
    email : z.string().email(),
    username : z.string().min(3,{
        message : 'Username should have atleast 3 characters'
    }).max(255),
    password : z.string().min(6,{
        message: "Password must have atleast 6 characters "
    }).max(255),
    contact : z.string().min(10,{
        message: "Must be 10 digits"
    }).max(10,{
        message: "Must be 10 digits"
    })
}); 


export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().min(6).max(255),
});


export const updateUserInput = z.object({
    name : z.string().min(3).max(255).optional(),
    contact : z.string().min(10).max(10).optional(),
    email : z.string().email().optional(),
    password : z.string().min(6,{
        message: "Must have atleast 6 characters"
    }).max(255,{
        message: "Password limit is 255 characters"
    }).optional(),
    

});

export const user = z.object({
    id : z.string(),
    name : z.string(),
    email : z.string(),
    contact : z.string(),
    emailVerified : z.boolean(),
    contactVerified : z.boolean(),
    createdAt : z.string(),
    updatedAt : z.string(),
});


