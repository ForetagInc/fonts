use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct DefaultLayoutProps {
	#[prop_or_default]
	pub children: Children,
}

#[function_component]
pub fn Layout(props: &DefaultLayoutProps) -> Html {
	html! {
		<>
			<div>
				<div class="bg:gray-90 min-h:110">
					{"test"}
				</div>
				<div class="flex px:64 jc:space-between ai:center bg:white bb:4|solid|gray-90 min-h:300">
					<h1>{"Fonts"}</h1>

					<ul class="flex">
						<li class="flex ai:center jc:center min-w:300 bg:black f:white h:300">
							{"Fonts"}
						</li>
						<li class="flex ai:center jc:center min-w:300  f:black h:300 br:4|solid|gray-90">
							{"Web"}
						</li>
					</ul>

					<div>
						{"No fonts selected"}
					</div>
				</div>
			</div>
			{props.children.to_owned()}
		</>
	}
}
