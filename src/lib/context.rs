use bounce::*;

#[derive(Default, PartialEq, Eq, Atom)]
pub struct Store {
	pub content: String,
	pub font_size: i32,
}
