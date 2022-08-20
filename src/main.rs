mod glyphs;
mod layouts;
mod lib;
mod types;

use yew::prelude::*;

use layouts::default::Layout;

#[function_component(App)]
fn app() -> Html {
	html! {
		<Index />
	}
}

#[function_component]
fn Index() -> Html {
	html! {
		<Layout />
	}
}

fn main() {
	yew::Renderer::<App>::new().render();
}
