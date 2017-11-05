import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import axios from "axios";
import multer from "multer";
import PDFParser from "pdf2json";

const storage = multer.diskStorage({
  destination: './files',
  //filename(req, file, cb) {
    //cb(null, `${new Date()}-${file.originalname}`);
  //}
});

const upload = multer({ storage });
const requestData = {
	supplier_pan_no:"",
	ap_narration: "",
	tds_type: "",
	description: "",
	hsn_code: "",
}

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.post('/upload', upload.single('file'), (req, res) => {

		const file = req.file;
		const meta = req.body;

		let pdfParser = new PDFParser();

		pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {

			const array = [];
			const array1 = [];

      pdfData.formImage.Pages.map((Page) => {
					Page.Texts.map((text) =>
					{
						text.R.map((r) =>
						{
							if(r.T === "%E2%80%8B"){
								array.push(" ");
								return;
							}
							else if(r.T === "%3A"){
								array.push(":");
								return;
							}
							else if(r.T === "%20C%20"){
								array.push("C");
								return;
							}
							else if(r.T === "%2C"){
								array.push(",");
								return;
							}
							array.push(r.T);
						})
					})
			});

			array.join("").split(",").map((arr) => {
				array1.push(arr.split(":"));
			});

			requestData.supplier_pan_no = array1[1][1];
			requestData.ap_narration = array1[4][1];
			requestData.tds_type = array1[5][1];
			requestData.description = array1[8][1];
			requestData.hsn_code = array1[9][1];
			console.log(JSON.stringify(requestData));
			res.json(requestData);
    });

    pdfParser.loadPDF(`./files/${file.filename}`);

	});

	return api;
}
