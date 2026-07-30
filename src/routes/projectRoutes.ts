import { Router } from 'express';
import {
    createProject,
    deleteProject,
    getProjectBySlug,
    getProjects,
    updateProject,
} from '../controllers/project.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/projects', getProjects);
router.get('/project/:slug', getProjectBySlug);

router.post('/project', authenticate, createProject);
router.put('/project/:id', authenticate, updateProject);
router.delete('/project/:id', authenticate, deleteProject);

export default router;
