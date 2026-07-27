import { Router } from 'express';
import {
    createProject,
    deleteProject,
    getProjectBySlug,
    getProjects,
    updateProject,
} from '../controllers/project.controller.js';

const router = Router();

router.get('/projects', getProjects);
router.get('/project/:slug', getProjectBySlug);
router.post('/project', createProject);
router.put('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);

export default router;
