import { useState } from "react";
import LabeledInput from "../components/labeledInput";
import axios from "axios";
import ImageContainer from "../components/ImageContainer";
import { toast } from "react-toastify";
import ImageSelector from "../components/ImageSelector";
import { base_url, token_key } from "../constants";

type carInfoType = {
  model: string;
  price: string;
  phone: string;
  city: string;
  numberOfPics: string;
};
const intialState = {
  model: "",
  price: "",
  phone: "",
  city: "",
  numberOfPics: "1",
};
export default function PostCar() {
  const [files, setFiles] = useState<File[]>([]);
  const [carInfo, setCarinfo] = useState<carInfoType>(intialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();
    const { model, price, phone } = carInfo;

    // Adding Rookie kind of validation should have used a library or handled in the backend
    if (!model) {
      return toast.error("Please specify Model");
    }
    if (!price) {
      return toast.error("Please specify Price");
    }
    if (!phone) {
      return toast.error("Please specify Phone");
    }

    if (phone.length < 10) {
      return toast.error("Phone number should be atleast 10 digits long");
    }

    formData.append("model", model);
    formData.append("price", price);
    formData.append("phone", phone);
    {
      files.map((image) => {
        console.log(image, "single image");
        return formData.append("carImages", image);
      });
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`${base_url}/car`, formData, {
        headers: {
          authorization: localStorage.getItem(token_key),
        },
      });
      toast.success((response.data.message as string).toLocaleUpperCase());
      setIsLoading(false);
      setCarinfo(intialState);
      setFiles([]);
    } catch (error) {
      toast.error("Invalid data");
      setIsLoading(false);
      console.log(error);
    }
  };

  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setCarinfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleDelete = (fileIndex: number) => {
    const oldFiles = [...files];
    const updatedFiles = oldFiles.filter((_, index) => fileIndex !== index);
    setFiles(updatedFiles);
  };

  const handleFilesSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(carInfo.numberOfPics);
    if (e.target.files) {
      if (e.target.files) {
        const newFiles: File[] = Array.from(e.target.files);
        const allFiles = [...files, ...newFiles];
        if (allFiles.length > +carInfo.numberOfPics) {
          toast.error("Select a correct number of Images");
          return;
        }
        setFiles(allFiles);
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center w-full mx-auto">
      <div className="flex flex-col gap-4 border p-3 w-[96%]">
        <LabeledInput
          value={carInfo.model}
          onChange={onChangeHandler}
          type="text"
          inputName="model"
          label="Model"
        />
        <LabeledInput
          value={carInfo.price}
          onChange={onChangeHandler}
          type="number"
          inputName="price"
          label="Price"
        />
        <LabeledInput
          value={carInfo.phone}
          onChange={onChangeHandler}
          type="tel"
          inputName="phone"
          label="Phone"
        />
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold">City:</h2>
          <input
            type="radio"
            id="lahore"
            name="city"
            value="Lahore"
            checked={carInfo.city == "Lahore"}
            className="h-[20px] w-[20px]"
            onChange={(e) => onChangeHandler(e)}
          />
          <label
            htmlFor="lahore"
            className="text-2xl font-normal cursor-pointer"
          >
            Lahore
          </label>
          <input
            type="radio"
            id="karachi"
            name="city"
            value="Karachi"
            checked={carInfo.city == "Karachi"}
            className="h-[20px] w-[20px]"
            onChange={(e) => onChangeHandler(e)}
          />
          <label
            htmlFor="karachi"
            className="text-2xl font-normal cursor-pointer"
          >
            Karachi
          </label>
        </div>
        <div className="flex">
          <label htmlFor="cars" className="text-3xl font-bold">
            Copies:
          </label>

          <select
            name="numberOfPics"
            id="numberOfPics"
            className="w-full border-2 ms-2"
            value={carInfo.numberOfPics}
            onChange={(e) => onChangeHandler(e)}
          >
            <option className="border-2" value="1">
              1
            </option>
            <option className="border-2" value="2">
              2
            </option>
            <option className="border-2" value="3">
              3
            </option>
            <option className="border-2" value="4">
              4
            </option>
          </select>
        </div>

        <div className="flex gap-2">
          {files.map((image, fileIndex) => {
            console.log(image);
            return (
              <ImageContainer
                key={fileIndex}
                image={image}
                handleDelete={handleDelete}
                fileIndex={fileIndex}
              />
            );
          })}
          <ImageSelector onChange={handleFilesSelection} />
        </div>
        <button
          className={`${
            isLoading
              ? "cursor-default  bg-slate-300"
              : "cursor-pointer  bg-slate-500"
          } p-2 font-semibold text-white rounded`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Adding" : "Add Car"}
        </button>
      </div>
    </div>
  );
}
