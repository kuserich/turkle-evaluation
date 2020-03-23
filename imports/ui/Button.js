import React from "react";

export default class Button extends React.Component {

    get classNames() {
        const { isSelected } = this.props;
        return isSelected ? "button button--selected" : "button";
    }

    render() {
        const { onClick } = this.props;
        return (
            <button className={this.classNames} onClick={onClick}>
                { this.props.children }
            </button>
        );
    }

}