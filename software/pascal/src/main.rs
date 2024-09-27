mod tri;
use tri::TriVec;

use std::process::ExitCode;

fn main() -> ExitCode {
	let Some(a) = std::env::args().skip(1).take(1).last() else {
		eprintln!("Provide at least 1 argument");
		return ExitCode::FAILURE;
	};
	let Ok(n) = a.parse::<usize>() else {
		eprintln!("Cannot parse arg");
		return ExitCode::FAILURE;
	};

	let Some(mut pasc) = TriVec::<usize>::with_row_cap(n) else {
		eprintln!("Triangle is too big!");
		return ExitCode::FAILURE;
	};
	todo!("Vec has `cap` but not `len`");
	pasc[0][0] = 1;
	pasc[1][0] = 1;
	pasc[1][1] = 1;

	ExitCode::SUCCESS
}
