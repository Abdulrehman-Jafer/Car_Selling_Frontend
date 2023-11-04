import React, { FormEvent, useState } from "react";
import LabeledInput from "../components/LabeledInput";
import axios from "axios";
import ImageContainer from "../components/ImageContainer";
import { toast } from "react-toastify";
import ImageSelector from "../components/ImageSelector";
import { base_url, token_key } from "../constants";

type carInfoType = {
  model: string;
  price: number | string;
  phone: string;
  city: string;
  numberOfPics: number;
};
const intialState = {
  model: "",
  price: "",
  phone: "",
  city: "Lahore",
  numberOfPics: 1,
};

const cityList = ["Lahore", "Karachi"];
const maxCarPicsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function PostCar() {
  const [files, setFiles] = useState<File[]>([]);
  const [carInfo, setCarinfo] = useState<carInfoType>(intialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const { model, price, phone, numberOfPics } = carInfo;

    // Adding Rookie kind of validation should have used a library or handled in the backend

    if (!model) return toast.error("Please specify Model");

    if (!price) return toast.error("Please specify Price");

    if (!phone) return toast.error("Please specify Phone");

    if (model.length < 3)
      return toast.error("Model must atleast be 3 characters long");

    if (phone.length < 11 || phone.length > 11)
      return toast.error("Phone number must be 11 digits");

    if (files.length < 1) return toast.error("Please add atleast one pic");

    formData.append("model", model);
    formData.append("price", `${price}`);
    formData.append("phone", phone);
    formData.append("numberOfPics", `${numberOfPics}`);
    /**
     * You won't be able to upload new files to a live Vercel Project outside of build and deployment time.
     *  But you can use an external service to store files uploaded via your site.
     */
    // {
    //   files.map((image) => {
    //     return formData.append("carImages", image);
    //   });
    // }

    try {
      setIsLoading(true);
      const response = await axios.post(`${base_url}/car`, formData, {
        headers: {
          authorization: localStorage.getItem(token_key),
        },
      });
      toast.success(response.data.message as string);
      setIsLoading(false);
      setCarinfo(intialState);
      setFiles([]);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      const errorMessage =
        (error as any).response.data.error.msg || "Something went wrong";
      toast.error(errorMessage);
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
    if (e.target.files) {
      const newFiles: File[] = Array.from(e.target.files);
      const allFiles = [...files, ...newFiles];
      if (allFiles.length > +carInfo.numberOfPics) {
        toast.error("Select a correct number of Images");
        return;
      }
      setFiles(allFiles);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center w-full mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border p-3 w-[96%]"
      >
        <LabeledInput
          value={carInfo.model}
          onChange={onChangeHandler}
          type="text"
          inputName="model"
          placeholder="Enter model"
          minLength={0}
          label="Model"
        />
        <LabeledInput
          value={carInfo.price}
          onChange={onChangeHandler}
          type="number"
          inputName="price"
          placeholder="Enter price"
          minLength={2}
          label="Price"
        />
        <LabeledInput
          value={carInfo.phone}
          onChange={onChangeHandler}
          type="tel"
          inputName="phone"
          placeholder="Enter phone"
          minLength={11}
          label="Phone"
          maxLength={11}
        />
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold">City:</h2>
          {cityList.map((c) => (
            <React.Fragment key={c}>
              <input
                type="radio"
                id={c}
                name="city"
                value={c}
                checked={carInfo.city == c}
                className="h-[20px] w-[20px]"
                onChange={(e) => onChangeHandler(e)}
              />
              <label
                htmlFor={c}
                className="text-2xl font-normal cursor-pointer"
              >
                {c}
              </label>
            </React.Fragment>
          ))}
        </div>
        <div className="flex">
          <label htmlFor="cars" className="text-3xl font-bold ">
            MaxPics:
          </label>

          <select
            name="numberOfPics"
            id="numberOfPics"
            className="w-full border-2 ms-2"
            value={carInfo.numberOfPics}
            onChange={(e) => onChangeHandler(e)}
          >
            {maxCarPicsOptions.map((o) => (
              <option key={o} className="border-2" value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {files.map((image, fileIndex) => {
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
          type="submit"
          className={`${
            isLoading
              ? "cursor-default  bg-blue-300"
              : "cursor-pointer  bg-blue-500  hover:bg-blue-600"
          } p-2 font-semibold text-white rounded disabled:bg-blue-300 disabled:cursor-default`}
          disabled={isLoading}
        >
          {isLoading ? "Adding" : "Add Car"}
        </button>
      </form>
    </div>
  );
}
