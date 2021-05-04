


import Contact from "./Contact"

it("renders conrrectly", () => {
    const wrapper = shallow(
        <Contact/>
    )

    expect(wrapper).toMatchSnapshot()
})