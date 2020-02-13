
    // eslint-disable-next-line import/no-deprecated
    import './de/mayflower/chuck/css/chuck.less';

    import { Main } from './de/mayflower/chuck';

    /** ****************************************************************************************************************
    *   Being invoked when the page is loaded completely.
    *
    *   TODO try to remove this? not required in Lenz application!
    *******************************************************************************************************************/
    window.onload = () : void  =>
    {
        Main.main();
    };

    /** ****************************************************************************************************************
    *   Being invoked when the page is left.
    *******************************************************************************************************************/
    window.onunload = () : void  =>
    {
    };
