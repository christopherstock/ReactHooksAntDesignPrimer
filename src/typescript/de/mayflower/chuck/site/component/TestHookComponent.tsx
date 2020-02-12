
    import * as React from 'react';
    import Button     from 'antd/lib/button';

    /** ****************************************************************************************************************
    *   Returns the custom React component 'TestDivider'
    *   without specifying a React Component Class.
    *******************************************************************************************************************/
    export const TestHookComponent : () => JSX.Element = () : JSX.Element =>
    {
        // create new state variable 'count' with setter 'setCount'
        const [ count, setCount ] :[number, React.Dispatch<React.SetStateAction<number>>] = React.useState<number>( 0 );

        return <div>

            <Button
                type="danger"
                onClick={
                    ( me: React.MouseEvent ) :void => {
                        setCount( count + 1 );
                    }
                }>
                This button was clicked [{ count }] times
            </Button>

        </div>;
    };
