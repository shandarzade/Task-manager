import { Router } from "express";
import { 
    getTask,
    addTask,
    updateTask,
    deleteTask
 } from "../controllers/task.controller.js";

const router = Router()

router.route("/get-task").get(getTask)
router.route("/add-task").post(addTask)
router.route("/update-task").post(updateTask)
router.route("/delete-task").post(deleteTask)

export default router