// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';
import React from "react";
import Enzyme, {shallow, render, mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { createSerializer } from "enzyme-to-json";
import sinon from "sinon";

global.fetch = require('jest-fetch-mock');

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }))

Enzyme.configure({ adapter: new Adapter() });

global.React = React;
global.shallow  = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;
