
    import * as React                   from 'react';
    import { Layout, Menu, Icon }       from 'antd';
    import { SelectParam }              from 'antd/lib/menu';
    import { Debug, MenuItem, Setting } from '../..';

    /** ****************************************************************************************************************
    *   React properties for the MainMenu component.
    *******************************************************************************************************************/
    export interface MenuProps
    {
        /** Being invoked when the selected menu item changes. */
        onChangeMenu: ( key:MenuItem ) => void;
    }

    /** ****************************************************************************************************************
    *   The react component that represents the site menu.
    *******************************************************************************************************************/
    export class MainMenu extends React.Component<MenuProps, any>
    {
        /** ************************************************************************************************************
        *   Being invoked every time this component renders.
        *
        *   @return The rendered JSX.
        ***************************************************************************************************************/
        public render() : JSX.Element
        {
            Debug.react.log( 'MainMenu.render() being invoked' );

            return <Layout.Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    theme="dark"
                    className="sider"
                >

                <img
                    src={ Setting.PATH_IMAGE + 'logo.png' }
                    alt={ Setting.TITLE }
                    className="logo"
                />

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={ [ MenuItem.RANDOM_JOKE ] }
                    onSelect={
                        ( param:SelectParam ) :void => {
                            this.props.onChangeMenu( param.key as MenuItem );
                        }
                    }
                >

                    <Menu.Item key={ MenuItem.RANDOM_JOKE }>
                        <Icon type="user" />
                        <span>{ MenuItem.RANDOM_JOKE }</span>
                    </Menu.Item>

                    <Menu.Item key={ MenuItem.DOWNLOAD }>
                        <Icon type="video-camera" />
                        <span>{ MenuItem.DOWNLOAD }</span>
                    </Menu.Item>

                    <Menu.Item key={ MenuItem.ABOUT }>
                        <Icon type="upload" />
                        <span>{ MenuItem.ABOUT }</span>
                    </Menu.Item>

                    <Menu.Item key={ MenuItem.GO_PREMIUM }>
                        <Icon type="user" />
                        <span>{ MenuItem.GO_PREMIUM }</span>
                    </Menu.Item>

                    <Menu.SubMenu
                        key={ MenuItem.EXTENDED }
                        title={
                        <span>
                        <Icon type="appstore" />
                        <span>{ MenuItem.EXTENDED }</span>
                        </span>
                    }>

                        <Menu.Item key={ MenuItem.LEGAL   }>{ MenuItem.LEGAL   }</Menu.Item>

                        <Menu.Item key={ MenuItem.IMPRINT }>{ MenuItem.IMPRINT }</Menu.Item>

                    </Menu.SubMenu>

                </Menu>

            </Layout.Sider>;
        }
    }
