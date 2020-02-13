
    import * as React                               from 'react';
    import Layout                                   from 'antd/lib/layout';
    import { Content, MainMenu, MenuItem, Setting } from '../..';

    /** ****************************************************************************************************************
    *   The react component that represents the entire website.
    *******************************************************************************************************************/
    export const Website :() => JSX.Element = () :JSX.Element =>
    {
        // create new state variable 'menuItem' with setter 'setMenuItem'
        const [ menuItem, setMenuItem ] :[MenuItem, React.Dispatch<React.SetStateAction<MenuItem>>] = React.useState<MenuItem>( MenuItem.DOWNLOAD );

        return <Layout>

            <MainMenu
                initialItem={ menuItem }
                onChangeMenu={ ( key:MenuItem ) :void => { setMenuItem( key ); } }
            />

            <Layout>

                <Layout.Header
                    className="header"
                >
                    { Setting.TITLE }
                </Layout.Header>

                <Content
                    currentSite={ menuItem }
                />

                <Layout.Footer
                    className="footer"
                >
                    { Setting.COPYRIGHT }
                </Layout.Footer>

            </Layout>

        </Layout>;
    };
