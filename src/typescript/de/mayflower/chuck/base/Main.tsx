
    import { Debug, Setting, Website } from '..';
    import * as React                  from 'react';
    import { render }                  from 'react-dom';

    /** ****************************************************************************************************************
    *   The main class contains the application's point of entry.
    *
    *   TODO Moxios Request mocking.
    *   TODO React Context.
    *   TODO React Hooks.
    *******************************************************************************************************************/
    export class Main
    {
        /** ************************************************************************************************************
        *   This method is invoked when the application starts.
        ***************************************************************************************************************/
        public static main() : void
        {
            // set website title
            document.title = Setting.TITLE;

            // acclaim debug console
            Debug.major.log( Setting.TITLE + ', ' + Setting.COPYRIGHT );
            Debug.major.log();

            // add container div
            const websiteContainer:HTMLDivElement = document.createElement( 'div' );
            document.body.appendChild( websiteContainer );

            // create and mount React component 'Website' into container div
            const websiteComponent:JSX.Element = <Website />;

            render(
                websiteComponent,
                websiteContainer
            );
        }
    }
