#[derive(Clone, Debug, PartialEq)]
pub struct Store {
	pub is_dark: bool,
	pub is_selectbar_open: bool,

	pub content: String,
	pub font_size: i8,

	pub selected_fonts: Vec<Font>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Font {
	family: String,
	weight: i16,
}
