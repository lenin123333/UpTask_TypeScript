import type { Request,Response } from "express"

export class ProjectController{

    static createProject= async(req:Request,res:Response)=>{
        res.send('Creadno proeycto')
    }

    static getAllProjects = async(req:Request,res:Response)=>{
        res.send('todos los proyectos')
    }
}