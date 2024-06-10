import React, { createContext, useState, useContext } from 'react';
var AuthContext = createContext(undefined);
export var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = useState(null), token = _b[0], setToken = _b[1];
    var _c = useState(null), user = _c[0], setUser = _c[1];
    return (React.createElement(AuthContext.Provider, { value: { token: token, setToken: setToken, user: user, setUser: setUser } }, children));
};
export var useAuth = function () {
    var context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
