use yew::prelude::*;

pub fn load_stylesheet(href: &str) {
	let window = web_sys::window().unwrap();
	let document = window.document().unwrap();
	let head = document.head().unwrap();

	let link = document.create_element("link").unwrap();
	link.set_attribute("rel", "stylesheet").unwrap();
	link.set_attribute("type", "text/css").unwrap();
	link.set_attribute("href", href).unwrap();

	head.append_child(&link).unwrap();
}
