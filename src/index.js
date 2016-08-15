import { render } from 'react-dom';
import { renderRoutes } from './routes.jsx';

import './ui/stylesheets/main.less';

render(renderRoutes(), document.getElementById('root'));
