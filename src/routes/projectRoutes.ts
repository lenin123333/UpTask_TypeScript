import { Router } from "express";
import { body, param } from 'express-validator'
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExist } from "../middleware/project";
import { taskBelongsToProject, taskExist } from "../middleware/task";
const router = Router();

router.post('/',
    body('projectName')
        .notEmpty().withMessage("El nombre del Poryecto es Obligatorio"),
    body('clientName')
        .notEmpty().withMessage("El nombre del Cliente es Obligatorio"),
    body('description')
        .notEmpty().withMessage("La descripcion del Poryecto es Obligatorio"),
    handleInputErrors,
    ProjectController.createProject);

router.get('/', ProjectController.getAllProjects)


router.get('/:id',
    param('id').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    ProjectController.getProjectById)

router.put('/:id',
    param('id').isMongoId().withMessage('ID no válido'),
    body('projectName')
        .notEmpty().withMessage("El nombre del Poryecto es Obligatorio"),
    body('clientName')
        .notEmpty().withMessage("El nombre del Cliente es Obligatorio"),
    body('description')
        .notEmpty().withMessage("La descripcion del Poryecto es Obligatorio"),
    handleInputErrors,
    ProjectController.updateProject)

router.delete('/:id',
    param('id').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    ProjectController.deleteProjet)
//routes task
//Cada que encuentre la variable projectId se ejecutara la funcion de validar
router.param('projectId', projectExist)

router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage("El nombre de la tarea es Obligatorio"),
    body('description')
        .notEmpty().withMessage("La descripcion de la tarea es Obligatorio"),
    handleInputErrors,
    TaskController.createTask)

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

//Cada que encuentre la variable projectId se ejecutara la funcion de validar
router.param('taskId', taskExist)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage("El nombre de la tarea es Obligatorio"),
    body('description')
        .notEmpty().withMessage("La descripcion de la tarea es Obligatorio"),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID no válido'),
    body('status')
        .notEmpty().withMessage('El estado es Obligatorio'),
    handleInputErrors,
    TaskController.updateStatus

)
export default router