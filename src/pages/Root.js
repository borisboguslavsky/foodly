import Introduction from '../components/Menu/Introduction';
import FilterRow from '../components/Menu/Filters/FilterRow';
import Menu from '../components/Menu/Menu';

/**
 * The main page of the application, accessible from '/menu', or from '/'
 * Renders out the introduction, filter row, and menu.
 */
const Root = () => {
  return (<>
    <Introduction />
    <FilterRow />
    <Menu />
  </>);
};

export default Root;
