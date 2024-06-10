var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from 'react';
// Define the EditProductModal component
var EditProductModal = function (_a) {
    var product = _a.product, onClose = _a.onClose, onSave = _a.onSave;
    var _b = useState(product.name), name = _b[0], setName = _b[1];
    var _c = useState(product.price), price = _c[0], setPrice = _c[1];
    var _d = useState(product.description), description = _d[0], setDescription = _d[1];
    var _e = useState(product.totalHarvest), totalHarvest = _e[0], setTotalHarvest = _e[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        onSave(__assign(__assign({}, product), { name: name, price: price, description: description, totalHarvest: totalHarvest }));
    };
    var modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        content: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '400px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        },
        formGroup: {
            marginBottom: '15px'
        },
        label: {
            display: 'block',
            marginBottom: '5px'
        },
        input: {
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc'
        },
        textarea: {
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            resize: 'vertical',
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        button: {
            padding: '8px 16px',
            marginLeft: '10px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white'
        }
    };
    return (React.createElement("div", { style: modalStyles.overlay },
        React.createElement("div", { style: modalStyles.content },
            React.createElement("h2", null, "Edit Product"),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement("div", { style: modalStyles.formGroup },
                    React.createElement("label", { style: modalStyles.label }, "Name:"),
                    React.createElement("input", { placeholder: 'name', type: "text", value: name, onChange: function (e) { return setName(e.target.value); }, style: modalStyles.input })),
                React.createElement("div", { style: modalStyles.formGroup },
                    React.createElement("label", { style: modalStyles.label }, "Price:"),
                    React.createElement("input", { placeholder: 'price', type: "number", value: price, onChange: function (e) { return setPrice(Number(e.target.value)); }, style: modalStyles.input })),
                React.createElement("div", { style: modalStyles.formGroup },
                    React.createElement("label", { style: modalStyles.label }, "Description:"),
                    React.createElement("textarea", { placeholder: 'description', value: description, onChange: function (e) { return setDescription(e.target.value); }, style: modalStyles.textarea })),
                React.createElement("div", { style: modalStyles.formGroup },
                    React.createElement("label", { style: modalStyles.label }, "Total Harvest:"),
                    React.createElement("input", { placeholder: 'total harvest', type: "number", value: totalHarvest, onChange: function (e) { return setTotalHarvest(Number(e.target.value)); }, style: modalStyles.input })),
                React.createElement("div", { style: modalStyles.buttonGroup },
                    React.createElement("button", { type: "button", onClick: onClose, style: modalStyles.button }, "Cancel"),
                    React.createElement("button", { type: "submit", style: modalStyles.button }, "Save"))))));
};
export default EditProductModal;
