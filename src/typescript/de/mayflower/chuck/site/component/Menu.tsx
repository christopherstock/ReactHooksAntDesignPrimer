
    import * as React      from 'react';
    import * as antd       from 'antd';
    import { SelectParam } from 'antd/lib/menu';
    import * as chuck      from '../..';

    /** ****************************************************************************************************************
    *   React properties for the Menu component.
    *******************************************************************************************************************/
    export interface MenuProps
    {
        /** Being invoked when the selected menu item changes. */
        onChangeMenu: ( key:chuck.MenuItem ) => void;
    }

    /** ****************************************************************************************************************
    *   The react component that represents the site menu.
    *******************************************************************************************************************/
    export class Menu extends React.Component<chuck.MenuProps, any>
    {
        /** ************************************************************************************************************
        *   Being invoked every time this component renders.
        *
        *   @return The rendered JSX.
        ***************************************************************************************************************/
        public render() : JSX.Element
        {
            chuck.Debug.react.log( 'Menu.render() being invoked' );

            return <antd.Layout.Sider
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

                <antd.Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={ [ chuck.MenuItem.RANDOM_JOKE ] }
                    onSelect={
                        ( param:SelectParam ) :void => {
                            this.props.onChangeMenu( param.key as chuck.MenuItem );
                        }
                    }
                >

                    <antd.Menu.Item key={ chuck.MenuItem.RANDOM_JOKE }>
                        <antd.Icon type="user" />
                        <span>{ chuck.MenuItem.RANDOM_JOKE }</span>
                    </antd.Menu.Item>

                    <antd.Menu.Item key={ chuck.MenuItem.DOWNLOAD }>
                        <antd.Icon type="video-camera" />
                        <span>{ chuck.MenuItem.DOWNLOAD }</span>
                    </antd.Menu.Item>

                    <antd.Menu.Item key={ chuck.MenuItem.ABOUT }>
                        <antd.Icon type="upload" />
                        <span>{ chuck.MenuItem.ABOUT }</span>
                    </antd.Menu.Item>

                    <antd.Menu.Item key={ chuck.MenuItem.GO_PREMIUM }>
                        <antd.Icon type="user" />
                        <span>{ chuck.MenuItem.GO_PREMIUM }</span>
                    </antd.Menu.Item>

                    <antd.Menu.SubMenu
                        key={ chuck.MenuItem.EXTENDED }
                        title={
                        <span>
                        <antd.Icon type="appstore" />
                        <span>{ chuck.MenuItem.EXTENDED }</span>
                        </span>
                    }>

                        <antd.Menu.Item key={ chuck.MenuItem.LEGAL   }>{ chuck.MenuItem.LEGAL   }</antd.Menu.Item>

                        <antd.Menu.Item key={ chuck.MenuItem.IMPRINT }>{ chuck.MenuItem.IMPRINT }</antd.Menu.Item>

                    </antd.Menu.SubMenu>

                </antd.Menu>

            </antd.Layout.Sider>;
        }
    }
