
    import * as React             from 'react';
    import { Layout, Menu, Icon } from 'antd';
    import { SelectParam }        from 'antd/lib/menu';
    import * as chuck             from '../..';

    /** ****************************************************************************************************************
    *   React properties for the MainMenu component.
    *******************************************************************************************************************/
    export interface MenuProps
    {
        /** Being invoked when the selected menu item changes. */
        onChangeMenu: ( key:chuck.MenuItem ) => void;
    }

    /** ****************************************************************************************************************
    *   The react component that represents the site menu.
    *******************************************************************************************************************/
    export class MainMenu extends React.Component<chuck.MenuProps, any>
    {
        /** ************************************************************************************************************
        *   Being invoked every time this component renders.
        *
        *   @return The rendered JSX.
        ***************************************************************************************************************/
        public render() : JSX.Element
        {
            chuck.Debug.react.log( 'MainMenu.render() being invoked' );

            return <Layout.Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    theme="dark"
                    className="sider"
                >

                <img
                    src={ chuck.Setting.PATH_IMAGE + 'logo.png' }
                    alt={ chuck.Setting.TITLE }
                    className="logo"
                />

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={ [ chuck.MenuItem.RANDOM_JOKE ] }
                    onSelect={
                        ( param:SelectParam ) :void => {
                            this.props.onChangeMenu( param.key as chuck.MenuItem );
                        }
                    }
                >

                    <Menu.Item key={ chuck.MenuItem.RANDOM_JOKE }>
                        <Icon type="user" />
                        <span>{ chuck.MenuItem.RANDOM_JOKE }</span>
                    </Menu.Item>

                    <Menu.Item key={ chuck.MenuItem.DOWNLOAD }>
                        <Icon type="video-camera" />
                        <span>{ chuck.MenuItem.DOWNLOAD }</span>
                    </Menu.Item>

                    <Menu.Item key={ chuck.MenuItem.ABOUT }>
                        <Icon type="upload" />
                        <span>{ chuck.MenuItem.ABOUT }</span>
                    </Menu.Item>

                    <Menu.Item key={ chuck.MenuItem.GO_PREMIUM }>
                        <Icon type="user" />
                        <span>{ chuck.MenuItem.GO_PREMIUM }</span>
                    </Menu.Item>

                    <Menu.SubMenu
                        key={ chuck.MenuItem.EXTENDED }
                        title={
                        <span>
                        <Icon type="appstore" />
                        <span>{ chuck.MenuItem.EXTENDED }</span>
                        </span>
                    }>

                        <Menu.Item key={ chuck.MenuItem.LEGAL   }>{ chuck.MenuItem.LEGAL   }</Menu.Item>

                        <Menu.Item key={ chuck.MenuItem.IMPRINT }>{ chuck.MenuItem.IMPRINT }</Menu.Item>

                    </Menu.SubMenu>

                </Menu>

            </Layout.Sider>;
        }
    }
