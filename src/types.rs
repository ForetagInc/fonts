pub struct Font {
	pub id: String,
	pub family: String,
	pub subsets: Vec<String>,
	pub weights: Vec<i16>,
	pub styles: Vec<String>,
	pub def_subset: String,
	pub variable: bool,
	pub last_modified: String,
	pub category: String,
	pub version: String,
	pub r#type: String,
}
