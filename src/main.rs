mod lib;
use lib::context::Store;

use std::rc::Rc;
use yew::prelude::*;

#[function_component]
fn App() -> Html {
	let store = use_memo(
		|_| Store {
			is_dark: false,
			is_selectbar_open: false,
			content: String::from("Almost before we knew it, we had left the ground."),
			font_size: 40,
			selected_fonts: vec![],
		},
		(),
	);

	html! {
		<ContextProvider<Rc<Store>> context={store}>
			<p>{"Test"}</p>
		</ContextProvider<Rc<Store>>>
	}
}

fn main() {
	yew::Renderer::<App>::new().render();
}
