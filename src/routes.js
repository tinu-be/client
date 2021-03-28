import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import * as Sentry from "@sentry/react";

function Routes() {
    return (
        <Sentry.ErrorBoundary fallback={"An error has occurred"}>
            <BrowserRouter>
                <>
                    <Route exact path="/" component={Home}></Route>
                </>
            </BrowserRouter>
        </Sentry.ErrorBoundary>
    );
}

export default Routes;