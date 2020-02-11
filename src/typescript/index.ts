
    // eslint-disable-next-line import/no-deprecated
    import './de/mayflower/chuck/css/chuck.less';
    import * as chuck from './de/mayflower/chuck';

    /** ****************************************************************************************************************
    *   Being invoked when the page is loaded completely.
    *******************************************************************************************************************/
    window.onload = () : void  =>
    {
        chuck.Main.main();
    };

    /** ****************************************************************************************************************
    *   Being invoked when the page is left.
    *******************************************************************************************************************/
    window.onunload = () : void  =>
    {
    };
