import type { Request, Response,NextFunction } from "express"
import Task, { ITask } from "../models/Task"

//Reinscribir el express
declare global {
    namespace Express{
        interface Request{
            task:ITask
        }
    }
}
export async function taskExist(req:Request,res:Response,next:NextFunction){
    try {
        const {taskId} = req.params
        const task = await Task.findById(taskId)
        if(!task){
            const error= new Error('Tarea no encotrado')
            return res.status(404).json({
                error:error.message  
            })
        }
        req.task=task
        next()
    } catch (error) {
        res.status(500).json({error:"Hubo un error"})
    }
}

export async function taskBelongsToProject(req:Request,res:Response,next:NextFunction){
    try {
        if (req.task.project.toString() !== req.project.id.toString()) {
            const error = new Error('Acción no valida')
            return res.status(400).json({
                error: error.message
            })
        }
        next()
    } catch (error) {
        res.status(500).json({error:"Hubo un error"})
    }
}