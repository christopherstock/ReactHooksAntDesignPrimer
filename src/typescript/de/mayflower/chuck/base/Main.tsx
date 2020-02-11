
    import * as chuck    from '..';
    import { Website }   from '..';
    import * as React    from 'react';
    import * as ReactDOM from 'react-dom';

    /** ****************************************************************************************************************
    *   The main class contains the application's point of entry.
    *******************************************************************************************************************/
    export class Main
    {
        /** ************************************************************************************************************
        *   This method is invoked when the application starts.
        ***************************************************************************************************************/
        public static main() : void
        {
            // set website title
            document.title = chuck.Setting.TITLE;

            // acclaim debug console
            chuck.Debug.major.log( chuck.Setting.TITLE + ', ' + chuck.Setting.COPYRIGHT );
            chuck.Debug.major.log();

            // add container div
            const websiteContainer:HTMLDivElement = document.createElement( 'div' );
            document.body.appendChild( websiteContainer );

            // create and mount React component 'Website' into container div
            const website:JSX.Element = <Website />;

            ReactDOM.render(
                website,
                websiteContainer
            );
        }
    }
