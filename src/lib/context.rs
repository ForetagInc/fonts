use std::rc::Rc;
use yew::prelude::*;

#[derive(Clone, Debug, PartialEq)]
pub struct Font {
	family: String,
	weight: i16,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Store {
	pub is_dark: bool,
	pub is_selectbar_open: bool,

	pub content: String,
	pub font_size: i8,

	pub selected_fonts: Vec<Font>,
}

impl Reducible for Store {
	type Action = Store;

	fn reduce(self: Rc<Self>, action: Self::Action) -> Rc<Self> {
		Store { ..action }.into()
	}
}

pub type StoreContext = UseReducerHandle<Store>;
