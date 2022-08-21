mod glyphs;
mod layouts;
mod lib;
mod types;

use lib::context::Store;

use bounce::*;
use web_sys::HtmlInputElement;
use yew::prelude::*;

use layouts::default::Layout;

#[function_component(App)]
fn app() -> Html {
	html! {
		<BounceRoot>
			<Index />
		</BounceRoot>
	}
}

#[function_component]
fn Index() -> Html {
	let store = use_atom::<Store>();

	let on_text_input = {
		let store = store.clone();

		Callback::from(move |e: InputEvent| {
			let input: HtmlInputElement = e.target_unchecked_into();

			store.set(Store {
				content: input.value(),
				..Default::default()
			});
		})
	};

	html! {
		<Layout>
			<input type="text" placeholder="preview" oninput={on_text_input} value={store.content.to_string()} />
		</Layout>
	}
}

fn main() {
	yew::Renderer::<App>::new().render();
}
