
    import * as chai   from 'chai';
    import * as Enzyme from 'enzyme';
    import * as React from 'react';
    import { Content, MenuItem } from '../../../../../typescript/de/mayflower/chuck';

    describe( 'React component Content', () =>
    {
        const wrapper: Enzyme.ShallowWrapper = Enzyme.shallow(
            <Content
                currentSite={ MenuItem.ABOUT }
            />
        );

        it( 'create the React component', () =>
        {
            chai.expect( wrapper.length ).to.equal( 1 );
        });

        it( 'assign the property "currentSite"', () =>
        {
            const contentComponent:Content = wrapper.instance() as Content;
            chai.expect( contentComponent.props.currentSite ).to.equal( MenuItem.ABOUT );
        });
    });
