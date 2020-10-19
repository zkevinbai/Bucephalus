import React from 'react';
import styled from 'styled-components';

export const Gridbox = ({
    LeftComponent,
    RightComponent,
    ShouldEmphasizeLeft,
}) => {
    debugger;

    if (ShouldEmphasizeLeft) {
        return (
            <div>
                I am a left emphasized gridbox
            </div>
        )
    }

    return (
        <div>
            I am a gridbox
        </div>
    );
}

export default Gridbox;