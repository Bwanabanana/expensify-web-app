import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import DotEnv from 'dotenv';

Enzyme.configure({ adapter: new Adapter() });

DotEnv.config({ path: '.env.test' });
